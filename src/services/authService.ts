const authService = {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = '/login';
  },
};

export default authService;