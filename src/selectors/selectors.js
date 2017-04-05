export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
export function getCoursesByAuthor(courses, author) {
  return courses.filter(course => course.authorId === author.id);
}
