import Echo from 'laravel-echo';
// eslint-disable-next-line no-unused-vars
import Pusher from 'pusher-js';

export const echo = new Echo({
  broadcaster: 'pusher',
  key: '8643a3700abe5694afad',
  cluster: 'en',
  forceTLS: false,
});
