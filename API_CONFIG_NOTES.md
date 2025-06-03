# API Configuration Notes

## SSL Protocol Error Fix

**Issue Resolved:** `POST https://localhost:5255/api/Authentication/login net::ERR_SSL_PROTOCOL_ERROR`

**Root Cause:** 
- Frontend was configured to use HTTPS (`https://localhost:5255/api`)
- Backend is configured to serve HTTP only (`http://localhost:5255`)
- This caused a protocol mismatch resulting in SSL protocol errors

**Solution Applied:**
- Changed default baseURL in `src/services/api.ts` from HTTPS to HTTP
- Updated refresh token endpoint path from `/auth/refresh` to `/Authentication/refresh`

**Current Configuration:**
```typescript
// src/services/api.ts
const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5255/api',
	// ...
})
```

**Environment Variables:**
- Set `VITE_API_BASE_URL=http://localhost:5255/api` in environment if different URL needed
- For production, use HTTPS URLs

**Backend Configuration:**
- Current: HTTP only on port 5255 (see `PL_TFTT_BACKEND/Properties/launchSettings.json`)
- All backend test files use HTTP consistently

**Note for Production:**
- Backend should be configured with HTTPS certificates
- Frontend should use HTTPS URLs in production environment 