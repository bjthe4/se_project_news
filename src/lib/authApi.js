// lib/authApi.js
// Simple auth utilities using localStorage to persist users across reloads.

const USERS_KEY = 'newsExplorerUsers';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * signup({ name, email, password })
 * - fails if email already exists
 */
export async function signup({ name, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = loadUsers();
      if (users.find((u) => u.email === email)) {
        reject(new Error('This email is not available'));
        return;
      }

      const user = {
        id: Date.now().toString(),
        name,
        email,
        password,
        favorites: [],
      };
      users.push(user);
      saveUsers(users);

      // Do not return password to caller
      const safeUser = { ...user };
      delete safeUser.password;
      resolve(safeUser);
    }, 500);
  });
}

/**
 * signin({ email, password })
 * - resolves to user object (no password) or rejects
 */
export async function signin({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = loadUsers();

      // Normal path: match by email + password
      let found = users.find(
        (u) => u.email === email && u.password === password
      );

      // Recovery path: if password was wiped previously, restore it
      if (!found) {
        const byEmail = users.find((u) => u.email === email);
        if (
          byEmail &&
          (byEmail.password === undefined || byEmail.password === null)
        ) {
          byEmail.password = password; // repair stored password
          saveUsers(users); // persist fix
          found = byEmail;
        }
      }

      if (!found) {
        reject(new Error('Invalid email or password'));
        return;
      }

      const safeUser = { ...found };
      delete safeUser.password;
      resolve(safeUser);
    }, 500);
  });
}
/**
 * updateUser(user) - overwrite user in localStorage (used to persist favorites)
 * Preserves existing password when not provided.
 */
export function updateUser(user) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    const existing = users[idx];
    const merged = { ...existing, ...user };

    // Keep the existing password if the update doesn't include one
    if (user.password === undefined) {
      merged.password = existing.password;
    }

    users[idx] = merged;
    saveUsers(users);
  }
}