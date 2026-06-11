function calculateHealth(
    devices
) {

    let score = 100;

    devices.forEach(device => {

        if (
            device.status ===
            "Offline"
        ) {
            score -= 20;
        }

        if (
            device.latency > 100
        ) {
            score -= 10;
        }

    });

    return Math.max(
        score,
        0
    );

}

export default
calculateHealth;