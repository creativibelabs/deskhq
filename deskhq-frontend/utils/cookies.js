import Cookies from 'js-cookie';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const cookieOptions = (days) => ({
    expires:  days,
    secure:   isProduction,
    sameSite: 'strict',
    path:     '/',
});

// ── Auth Cookies ──────────────────────────────────────────

export const setAuthCookies = (data, rememberMe = false) => {
    const days = rememberMe ? 30 : 1;

    Cookies.set('AuthToken',   data.token,                    cookieOptions(days));
    Cookies.set('AuthUser',    JSON.stringify(data.user),     cookieOptions(days));
    Cookies.set('AuthRole',    data.user.role,                cookieOptions(days));
    Cookies.set('AuthSubRole', data.user.prod_role ?? '',     cookieOptions(days));
};

export const getAuthToken = () =>
    Cookies.get('AuthToken') ?? null;

export const getAuthUser = () => {
    const user = Cookies.get('AuthUser');
    return user ? JSON.parse(user) : null;
};

export const getAuthRole = () =>
    Cookies.get('AuthRole') ?? null;

export const getAuthSubRole = () =>
    Cookies.get('AuthSubRole') ?? null;

export const clearAuthCookies = () => {
    Cookies.remove('AuthToken',   { path: '/' });
    Cookies.remove('AuthUser',    { path: '/' });
    Cookies.remove('AuthRole',    { path: '/' });
    Cookies.remove('AuthSubRole', { path: '/' });
};

export const isAuthenticated = () =>
    !!Cookies.get('AuthToken');

// ── Forgot Password Cookie ────────────────────────────────

export const setFPEmailCookie = (email) => {
    Cookies.set('DHQAdminFPEmail', email, {
        ...cookieOptions(null),
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
    });
};

export const getFPEmailCookie = () =>
    Cookies.get('DHQAdminFPEmail') ?? null;

export const clearFPEmailCookie = () =>
    Cookies.remove('DHQAdminFPEmail', { path: '/' });

export const hasFPEmailCookie = () =>
    !!Cookies.get('DHQAdminFPEmail');