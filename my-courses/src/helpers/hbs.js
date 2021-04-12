module.exports = {
  isAuthor(author, user) {
    return author.id === user.id;
  },
  isStudent(courseId, user) {
    return user.courses && user.courses.some(course => course.id == courseId);
  },
  isStudentOrTeacher({ author, user, id }) {
    if (!user) return false;

    const isTeacher = author.id === user.id;
    if (isTeacher) return true;

    const isStudent = user.courses && user.courses.some(c => c.id == id);
    return isStudent;
  },
};
