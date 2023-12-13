import { useNavigate } from 'react-router-dom';

export function setSessionStorage(userId, token, expiresIn) {
	const tokenExpiration = Date.now() / 1000 + expiresIn;

	sessionStorage.setItem('userId', userId);
	sessionStorage.setItem('token', token);
	sessionStorage.setItem('tokenExpiration', tokenExpiration.toString());
}

export function clearSessionStorage() {
	sessionStorage.clear();
}

export function isTokenValid() {
	const token = sessionStorage.getItem('token');
	if (!token) {
		return false;
	}
	const tokenExpiration = sessionStorage.getItem('tokenExpiration');
	if (!tokenExpiration) {
		return false;
	}
	const current_time = Date.now() / 1000;
	if (current_time > +tokenExpiration) {
		// Token expired
		clearSessionStorage(); // you may want to clear the invalid token
		return false;
	}
	// Token is still valid
	return true;
}
