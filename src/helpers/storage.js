//export const getToken = () => {
//  const token = localStorage.getItem('token');
//  if(token){

//  }
//}

export const checkLoginStatus = () => !!localStorage.getItem('token');