self.addEventListener('install', (event) => {
    console.log("Almacenando archivos en cachee....");
    const wu = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const addFiles = ""; 
                console.log("Service Worker installed Espe");
                resolve();
            }, 1000);
            self.skipWaiting(); 
        } catch (error) {
            reject(error);
        }
    });
    event.waitUntil(wu); 
});
self.addEventListener('activate', (event) => {
    console.log("Service Worker activated");
    event.waitUntil(clients.claim()); 
});
self.addEventListener('fetch', (event) => {
    console.log("Cacheando claims");
});

self.addEventListener("sync", (event) => {
    console.log(event);
});

self.addEventListener("push", (event) => {
    console.log("Push notification received", event);
});
