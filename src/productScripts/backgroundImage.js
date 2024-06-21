let snakeBg1;
let shenronBg1;
let hallowsBg1;
let fourBg1;

const fetchBackgrounds = () => {
    return fetch('https://mechamod-backend.vercel.app/keycaps')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.order_position - b.order_position);
            const firstFourKeycaps = data.slice(0, 4);

            // Assign background paths one by one
            snakeBg1 = firstFourKeycaps[0].background_path;
            console.log(`snakeBg1: ${snakeBg1}`);

            shenronBg1 = firstFourKeycaps[1].background_path;
            console.log(`shenronBg1: ${shenronBg1}`);

            hallowsBg1 = firstFourKeycaps[2].background_path;
            console.log(`hallowsBg1: ${hallowsBg1}`);

            fourBg1 = firstFourKeycaps[3].background_path;
            console.log(`fourBg1: ${fourBg1}`);
        })
        .catch(error => console.error('Error fetching keycap data:', error));
};

export { fetchBackgrounds, snakeBg1, shenronBg1, hallowsBg1, fourBg1 };
