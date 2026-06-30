type IconProps = {
  className?: string;
};

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-3.162 19.496c.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.775.603-3.362-1.337-3.362-1.337-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.338-2.219-.253-4.555-1.11-4.555-4.94 0-1.091.39-1.984 1.03-2.683-.103-.252-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0 1 12 6.84c.85.004 1.705.115 2.505.338 1.909-1.294 2.748-1.025 2.748-1.025.545 1.377.202 2.394.1 2.646.64.699 1.03 1.592 1.03 2.683 0 3.839-2.338 4.703-4.566 4.951.359.309.679.919.679 1.852 0 1.337-.012 2.416-.012 2.744 0 .267.18.577.688.479A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 8h4.6v15H.2V8Zm7.6 0h4.4v2.05h.06C13.02 8.76 14.48 7.8 16.56 7.8c4.42 0 5.24 2.91 5.24 6.69V23H17.2v-7.49c0-1.79-.03-4.09-2.49-4.09-2.5 0-2.88 1.95-2.88 3.96V23H7.8V8Z" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} stroke="currentColor" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
