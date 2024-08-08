db = db.getSiblingDB('messaging-api');

db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'messaging-api' }],
});

db.users.insertMany([
  { username: 'Moises Ochoa', password: 'hashed_password' },
  { username: 'Deep Company', password: 'hashed_password' },
]);

db.messages.insertMany([
  { _id: '1', sender: 'Moises Ochoa', receiver: 'Deep Company', content: 'Hola, como estan?!, esta es mi prueba tecnica', isRead: false, isStarred: false },
  { _id: '2', sender: 'Deep Company', receiver: 'Moises Ochoa', content: 'Hola, recibida', isRead: true, isStarred: false },
]);
