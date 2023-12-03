function validateFileType(file: File | null) {
  if (!file) return false;
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {
    console.log('Invalid file type. Please upload JPEG or PNG');
    return false;
  }
  return true;
}
function validateFileSize(file: File | null) {
  if (!file) return false;
  const maxSze = 4194304;

  if (file.size > maxSze) {
    console.log('Too big. Max 4Mb');
    return false;
  }
  return true;
}

export { validateFileType, validateFileSize };
