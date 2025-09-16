// components/NewsCard.jsx
import React, { useState } from 'react';
import './NewsCard.css';
import { Link } from 'react-router-dom';

/**
 * NewsCard Component
 * - Renders a single news article card.
 * - Supports "Save to favorites" / "Remove from favorites" if user is signed in.
 * - Displays a tooltip on hover/focus over the bookmark button.
 */
export default function NewsCard({ item,toggleFavorite,user,isAuthenticated }) {
  const [showTooltip, setShowTooltip] = useState(false); // Local state for tooltip visibility

  // Check if this article is already saved in user's favorites
  const isFavorite = !!(
    user && (user.favorites || []).find((f) => f.id === item.id)
  );

  // Tooltip message depends on auth + favorite state
  const tooltipText = isAuthenticated
    ? isFavorite
      ? 'Remove from favorites'
      : 'Save to favorites'
    : 'Sign in to save articles';

  /**
   * Handle bookmark toggle
   * - Prevents <Link> navigation
   * - Calls toggleFavorite from context
   * - Falls back with alert if not authenticated
   */
  function handleToggle(e) {
    e.preventDefault(); // Prevent link click from firing
    e.stopPropagation(); // Prevent bubbling up

    try {
      toggleFavorite(item);
    } catch (err) {
      alert('Please sign in to save articles.');
    }
  }

  return (
    // Whole card is wrapped in a <Link> to open article in new tab
    <Link to={item?.url} target='_blank' rel='noopener noreferrer'>
      <article className='newsCard' aria-labelledby={`news-title-${item.id}`}>
        {/* Top section: image + bookmark button */}
        <div className='cardMedia'>
          {/* Article image, clickable */}
          <Link to={item?.url} target='_blank' rel='noopener noreferrer'>
            <img src={item.img} alt={item.title} />
          </Link>

          {/* Bookmark button (save/remove) */}
          <button
            type='button'
            className={`bookmarkBtn ${isFavorite ? 'active' : ''}`}
            onClick={handleToggle}
            aria-pressed={isFavorite}
            aria-label={tooltipText}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            {isFavorite ? (
              // If favorited: trash icon (remove)
              <svg
                viewBox='0 0 24 24'
                width='18'
                height='18'
                aria-hidden='true'
              >
                <path
                  d='M3 6h18M9 6v12m6-12v12M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              // If not favorited: bookmark icon (save)
              <svg
                viewBox='0 0 24 24'
                width='18'
                height='18'
                aria-hidden='true'
              >
                <path
                  d='M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z'
                  className='bookmarkSvgPath'
                />
              </svg>
            )}
          </button>

          {/* Tooltip shown on hover/focus */}
          {showTooltip && (
            <div className='iconTooltip' role='status' aria-live='polite'>
              {tooltipText}
            </div>
          )}
        </div>

        {/* Bottom section: article info */}
        <div className='cardBody'>
          {/* Publish date (formatted) */}
          <div className='cardDate'>
            {new Date(item.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* Title (clickable) */}
          <h3 id={`news-title-${item.id}`} className='cardTitle'>
            <Link to={item?.url} target='_blank' rel='noopener noreferrer'>
              {item.title}
            </Link>
          </h3>

          {/* Short description */}
          <p className='cardDesc'>{item.desc}</p>

          {/* Publisher/Author */}
          <div className='cardPublisher'>
            {(item.author || '').toUpperCase()}
          </div>
        </div>
      </article>
    </Link>
  );
}
