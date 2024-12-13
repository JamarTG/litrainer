self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then(async (response) => {
      const responseClone = response.clone();
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
      newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');

      return responseClone.blob().then((body) => {
        const moddedResponse = new Response(body, {
          status: response.status === 0 ? 200 : response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
        return moddedResponse;
      });
    }).catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    })
  );
});