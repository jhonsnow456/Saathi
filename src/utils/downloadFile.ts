function downloadFile(path: string, name: string): void {
  const link = document.createElement('a');
  link.href = path;
  link.download = name;
  link.dispatchEvent(new MouseEvent('click'));
  link.remove();
}

export default downloadFile;
