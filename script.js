let array = [];
//Size of Random array for sorting
let size = 20;

function resetArray() {
    return new Promise(resolve => {
        const arraySizeInput = document.getElementById('array-size');
        array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        renderArray();
        resolve(); // Resolve the promise to signal that the array is reset
    });
}

function renderArray() {
    const visualizationContainer = document.getElementById('visualization-container');
    visualizationContainer.innerHTML = '';
    array.forEach(value => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        const bar = document.createElement('div');
        bar.style.height = `${value * 4}px`;
        bar.className = 'bar';

        const barSize = document.createElement('div');
        barSize.className = 'bar-size';
        barSize.textContent = value;

        barContainer.appendChild(bar);
        barContainer.appendChild(barSize);
        visualizationContainer.appendChild(barContainer);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(i, j) {
    await sleep(50); // Adjust the swap speed
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    renderArray();
}

async function bubbleSort() {
    await resetArray();
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

// Similar modifications for other sorting algorithms...

async function selectionSort() {
    await resetArray();
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
        }
    }
}

async function insertionSort() {
    await resetArray();
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            await sleep(50); // Adjust the swap speed
            renderArray();
        }
        array[j + 1] = key;
        renderArray();
    }
}

async function mergeSort() {
    await resetArray();

    async function merge(start, middle, end) {
        let left = array.slice(start, middle + 1);
        let right = array.slice(middle + 1, end + 1);

        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
            await sleep(50); // Adjust the swap speed
            renderArray();
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            k++;
            await sleep(50); // Adjust the swap speed
            renderArray();
        }

        while (j < right.length) {
            array[k] = right[j];
            j++;
            k++;
            await sleep(50); // Adjust the swap speed
            renderArray();
        }
    }

    async function mergeSortHelper(start, end) {
        if (start < end) {
            const middle = Math.floor((start + end) / 2);
            await mergeSortHelper(start, middle);
            await mergeSortHelper(middle + 1, end);
            await merge(start, middle, end);
        }
    }

    await mergeSortHelper(0, array.length - 1);
}

async function quickSort() {
    await resetArray();

    async function partition(low, high) {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                await swap(i, j);
            }
        }

        await swap(i + 1, high);
        return i + 1;
    }

    async function quickSortHelper(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }

    await quickSortHelper(0, array.length - 1);
}

async function heapSort() {
    await resetArray();

    async function heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            await swap(i, largest);
            await heapify(n, largest);
        }
    }

    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
        await swap(0, i);
        await heapify(i, 0);
    }
}

// Call resetArray() to initialize the array when the page loads
resetArray();
