import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import updateProfileStyles from "../styles/updateProfile.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import {
  getEventConsumers,
  getEventProviders,
  updateEventConsumerByEmail,
  updateEventProviderByEmail,
  useRole,
} from "../utils/helper";
import Layout from "../components/layout";
import { EventProviderProps } from "../lib/customProp";

export default function UpdateProfile() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const { currentUser, updatePassword, updateEmail, updateDisplayName } =
    useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { role, isLoading, isError } = useRole(currentUser.email);

  useEffect(() => {
    console.log(role);
  }, [role]);

  async function handleSubmit(e) {
    e.preventDefault();

    // check uniqueness of user input name
    const roleNames =
      role.role === "provider"
        ? (await getEventProviders()).map((provider) => provider.name)
        : role.role === "consumer"
        ? (await getEventConsumers()).map((consumer) => consumer.name)
        : "error";

    if (
      nameRef.current.value !== currentUser.displayName &&
      roleNames.includes(nameRef.current.value)
    ) {
      return setError("Name is already taken");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    // update firebase auth currentUser
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateDisplayName(nameRef.current.value));
    }

    // update PSQL event provider data
    if (
      nameRef.current.value !== currentUser.displayName ||
      emailRef.current.value !== currentUser.email ||
      passwordRef.current.value ||
      phoneRef.current.value || // TODO - [saving api calls] make it only true if this field is updated.
      aboutRef.current.value // TODO - [saving api calls] make it only true if this field is updated.
    ) {
      const updateRoleData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        about: aboutRef.current.value,
      };

      if (role.role === "provider") {
        promises.push(
          updateEventProviderByEmail(currentUser.email, updateRoleData)
        );
      } else if (role.role === "consumer") {
        promises.push(
          updateEventConsumerByEmail(currentUser.email, updateRoleData)
        );
      }
    }

    Promise.all(promises)
      .then(() => {
        router.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Layout>
      <Head>
        <title>Update Profile</title>
      </Head>
      {isError ? (
        <span>Error</span>
      ) : !isLoading ? (
        <div className={updateProfileStyles["update-profile-container"]}>
          <div className={updateProfileStyles["update-profile-card"]}>
            <h2>Update Profile</h2>
            {error && <span>{error}</span>}
            <form
              action=""
              className={updateProfileStyles["update-profile-form"]}
              onSubmit={handleSubmit}
            >
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                ref={nameRef}
                id="nameInput"
                required
                defaultValue={currentUser.displayName}
              />
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                ref={emailRef}
                id="emailInput"
                required
                defaultValue={currentUser.email}
              />
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                ref={passwordRef}
                id="passwordInput"
                placeholder="Leave blank to keep the same"
              />
              <label htmlFor="passwordConfirmInput">
                Password Confirmation
              </label>
              <input
                type="password"
                ref={passwordConfirmRef}
                id="passwordConfirmInput"
                placeholder="Leave blank to keep the same"
              />
              <label htmlFor="phoneInput">Phone</label>
              <input
                type="number"
                ref={phoneRef}
                id="phoneInput"
                defaultValue={role.phone}
              />
              <label htmlFor="aboutInput">About</label>
              {/* @ts-ignore */}
              <textarea
                name=""
                id="aboutInput"
                ref={aboutRef}
                cols={30}
                rows={10}
                defaultValue={role.about}
              />
              <button
                disabled={loading}
                type="submit"
                className={updateProfileStyles["update-button"]}
              >
                Update
              </button>
              <button onClick={() => router.push("/profile")}>Cancel</button>
            </form>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
