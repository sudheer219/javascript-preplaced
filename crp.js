function animate(time) {
  const delta = time - previous;

  x += speed * delta;

  previous = time;

  requestAnimationFrame(animate);
}