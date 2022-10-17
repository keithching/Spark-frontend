import React, { useState, useEffect } from 'react'
import eventCategoryStyles from '../styles/eventCategory.module.css';

export default function EventCategory({ category }) {
    return (
        <div className={eventCategoryStyles.category}>
            {category}
        </div>
  );
}
