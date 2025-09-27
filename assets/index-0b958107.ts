import("./bootstrap/index.ts")
    .then(() => import("./core/App"))
    .then(({ App }) => {
        App.init();
    })
    .catch((error) => {
        console.error("Error loading app", error);
    });
