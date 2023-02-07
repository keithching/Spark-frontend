import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import profileStyle from "../styles/profile.module.css";
import Layout from "../components/layout";
import Image from "next/image";
import { uploadImageAsync } from "../utils/imageUpload";
import { EventProviderProps } from "../lib/customProp";
import { useEventConsumer, useEventProvider } from "../utils/helper";

type Role = string;

export default function Profile() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { currentUser, logout, updatePhotoURL } = useAuth();
  const profileImageRef = useRef(null);
  const { eventProvider, isLoadingEP, isErrorEP } = useEventProvider(
    currentUser.email
  );
  const { eventConsumer, isLoadingEC, isErrorEC } = useEventConsumer(
    currentUser.email
  );
  const [role, setRole] = useState<Role>("");
  const [photoURL, setPhotoURL] = useState<any>(currentUser.photoURL);
  const photoRef = useRef<HTMLInputElement>(null);
  const isClick = useRef(false);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    if (eventProvider) {
      setRole("provider");
    } else if (eventConsumer) {
      setRole("consumer");
    }
  }, [eventProvider, eventConsumer]);

  const ProfileImage = () => {
    // [Refactor] same code block from Modal.tsx

    const imageUploadTextRef = useRef(null);
    // no component rendering will be triggered with useRef
    const isHover = useRef(false);
    const handleProfilePhotoMouseEnter = () => {
      if (photoURL == null) {
        console.log("fish!!");
        isHover.current = true;
        imageUploadTextRef.current.classList.add(`${profileStyle["show"]}`);
        profileImageRef.current.classList.add(
          `${profileStyle["profile-image-hover"]}`
        );
      }
    };

    const handleProfilePhotoMouseLeave = () => {
      isHover.current = false;
      imageUploadTextRef.current.classList.remove(`${profileStyle["show"]}`);
      profileImageRef.current.classList.remove(
        `${profileStyle["profile-image-hover"]}`
      );
    };

    const handleProfilePhotoClick = () => {
      isClick.current = true;
      photoRef.current.click();
    };

    const PhotoInput = () => {
      const [photoFile, setPhotoFile] = useState<any>(null);

      const handlePhotoInputChange = (e) => {
        // event cancelling
        if (e.target.value.length === 0) {
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(photoRef.current.files[0]);
        setPhotoFile(photoRef.current.files[0]);

        reader.onload = (readerEvent) => {
          setPhotoURL(readerEvent.target.result);
        };
      };

      return (
        <div className={profileStyle["profile-image-upload-input"]}>
          <input
            style={{ visibility: "hidden" }}
            type="file"
            name="photoInput"
            id="photoInput"
            ref={photoRef}
            onChange={handlePhotoInputChange}
          />
        </div>
      );
    };

    return (
      <div className={profileStyle["profile-image-container"]}>
        <div
          className={profileStyle["profile-image"]}
          onMouseEnter={handleProfilePhotoMouseEnter}
          onMouseLeave={handleProfilePhotoMouseLeave}
          onClick={handleProfilePhotoClick}
          ref={profileImageRef}
        >
          <div
            ref={imageUploadTextRef}
            className={profileStyle["profile-image-upload-text"]}
          >
            UPLOAD
          </div>
          <PhotoInput />
          {photoURL ? (
            <Image
              src={photoURL}
              alt=""
              width={400}
              height={400}
              objectFit="cover"
            />
          ) : null}
        </div>
        {photoURL !== "" && isClick.current ? (
          <div className={profileStyle["update-operation-buttons"]}>
            <button
              className={profileStyle["update-button"]}
              onClick={handleUpdateClick}
            >
              update
            </button>
            <button
              className={profileStyle["cancel-button"]}
              onClick={handleCancelClick}
            >
              cancel
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const handleUpdateClick = async () => {
    // TODO
    try {
      // save image to firebase cloud storage
      const downloadURL = await uploadImageAsync(photoURL, "profiles");
      await updatePhotoURL(downloadURL);
      // set image URL to firebase auth currentUser
      setPhotoURL(currentUser.photoURL);
      isClick.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    if (!currentUser.photoURL) {
      setPhotoURL("");
    } else setPhotoURL(currentUser.photoURL);
    isClick.current = false;
  };

  const Badge = () => {
    const style = {
      backgroundColor: role === "consumer" ? "green" : "blue",
      padding: "5px 10px",
      borderRadius: "5px",
      color: "white",
      width: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return <div style={style}>{role}</div>;
  };

  return (
    <Layout>
      <Head>
        <title>Profile Page</title>
      </Head>
      {isErrorEP && isErrorEC ? (
        <span>Error</span>
      ) : (!isLoadingEP && eventProvider) || (!isLoadingEC && eventConsumer) ? (
        <div className={profileStyle.profile}>
          <div className={profileStyle["profile-container"]}>
            <div className={profileStyle["profile-info"]}>
              {error && <span>{error}</span>}
              <div className={profileStyle["profile-info-name"]}>
                {currentUser.displayName}
              </div>
              <Badge />
              <div className={profileStyle["profile-info-email"]}>
                Email: {currentUser.email}
              </div>
              <div className={profileStyle["profile-info-phone"]}>
                Phone:{" "}
                {eventProvider ? eventProvider.phone : eventConsumer.phone}
              </div>
              <div className={profileStyle["profile-info-about"]}>
                About:{" "}
                {eventProvider ? eventProvider.about : eventConsumer.about}
              </div>
              <div className={profileStyle["function-buttons"]}>
                <button
                  className={profileStyle["update-profile-button"]}
                  onClick={() => router.push("/update-profile")}
                >
                  Update Profile
                </button>
                <button
                  className={profileStyle["logout-button"]}
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
            <ProfileImage />
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
