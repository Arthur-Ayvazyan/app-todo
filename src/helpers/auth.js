import decode from 'jwt-decode';

export const checkLoginStatus = () => !!localStorage.getItem('token');

export function saveToken(token) {
   localStorage.setItem('token', JSON.stringify(token));
}

export const getToken = () => {

   const token = localStorage.getItem('token');

   if (token) {
      const parsed = JSON.parse(token);
      const decoded = decode(parsed.jwt);
      const now = new Date().getTime() / 1000;

      if (decoded.exp - now > 60) {
         return parsed.jwt;
      }

      else {

         const apiHost = process.env.REACT_APP_API_HOST;

         fetch(`${apiHost}/user/${decoded.userId}/token`, {
            method: 'PUT',
            body: JSON.stringify({
               refreshToken: parsed.refreshToken
            }),
            headers: {
               'Content-Type': 'application/json',
            },
         })
            .then(res => res.json())
            .then(token => {
               saveToken(token);
               return token.jwt;
            })
      }
   }
}