import { fetchBackgrounds, snakeBg1, shenronBg1, hallowsBg1, fourBg1 } from "../productScripts/backgroundImage";
// const baseURL = 'https://mechamod-backend.vercel.app'; // Update with your deployed URL

const baseURL = 'http://3.142.172.85:3000'; // Update with your deployed URL

export async function fetchKeycaps() {
    try {
        const response = await fetch(`${baseURL}/keycaps`);
        console.log(`Connecting to ${baseURL}`);
        const keycaps = await response.json();

        // Call fetchBackgrounds to fetch background images
        await fetchBackgrounds();

        // Function to fetch STL path for a specific keycap
        const fetchSTLPath = async (keycap) => {
            try {
                const stlResponse = await fetch(`${baseURL}/keycaps/${keycap.id}/stl_path`);
                const stlData = await stlResponse.json();
                return stlData.stl_path || ''; // Return STL path or empty string if not found
            } catch (error) {
                console.error(`Error fetching STL path for keycap ${keycap.id}:`, error);
                return ''; // Return empty string on error
            }
        };

        // Fetch STL path for each keycap asynchronously
        // const keycapsWithSTL = await Promise.all(keycaps.map(async (keycap) => {
        //     const stlPath = await fetchSTLPath(keycap);
        //     return {
        //         ...keycap,
        //         stl_path: stlPath
        //     };
        // }));

        // Update HTML content with keycap data
        keycaps.forEach((keycap, index) => {
            const containerId = `product-container${index}`;
            const containerElement = document.getElementById(containerId);

            if (containerElement) {
                // Update content inside each product container
                containerElement.querySelector('.product-left-text-title').innerHTML = keycap.name;

                // Format the price
                const priceNumber = parseFloat(keycap.price);
                const formattedPrice = new Intl.NumberFormat('en-IN').format(priceNumber);
                containerElement.querySelector('.price').innerHTML = `${formattedPrice} INR`;

                containerElement.querySelector('.product-left-text-header').innerHTML = keycap.description;

                // Update bullet points
                const bulletList = containerElement.querySelector('.product-left-text-bottom');
                bulletList.innerHTML = ''; // Clear existing list items

                // Add each bullet point from the keycap object
                if (keycap.bullet1) {
                    const bullet1 = document.createElement('li');
                    bullet1.textContent = keycap.bullet1;
                    bulletList.appendChild(bullet1);
                }

                if (keycap.bullet2) {
                    const bullet2 = document.createElement('li');
                    bullet2.textContent = keycap.bullet2;
                    bulletList.appendChild(bullet2);
                }

                if (keycap.bullet3) {
                    const bullet3 = document.createElement('li');
                    bullet3.textContent = keycap.bullet3;
                    bulletList.appendChild(bullet3);
                }

                if (keycap.bullet4) {
                    const bullet4 = document.createElement('li');
                    bullet4.textContent = keycap.bullet4;
                    bulletList.appendChild(bullet4);
                }

                // Set background images
                containerElement.style.backgroundImage = `url(${getImageUrlByIndex(index)})`;
            }
        });

        return keycapsWithSTL; // Return keycaps data with STL path included
    } catch (error) {
        console.error('Error fetching keycaps:', error);
        return []; // Return empty array on error
    }
}

// Function to get image URL by index
function getImageUrlByIndex(index) {
    switch (index) {
        case 0:
            return snakeBg1;
        case 1:
            return shenronBg1;
        case 2:
            return hallowsBg1;
        case 3:
            return fourBg1;
        default:
            return '';
    }
}
