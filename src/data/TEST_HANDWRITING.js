const TEST_HANDWRITING = {
    details: {
        name: 'handwriting'
    },
    questions: [
    {
        "id": 1,
        "question": "Draw a circle. The student may NOT erase.", 
        "image": "",
        "type": "draw"
    },
    {
        "id": 2,
        "question": "Copy each shape. The student may NOT erase.",
        "image": require('../assets/draw-1.png').default,
        "type": "draw"
    },
    {
        "id": 3,
        "question": "Copy each shape. The student may NOT erase.",
        "image": require('../assets/draw-2.png').default,
        "type": "draw"
    },
    {
        "id": 4,
        "question": "Copy each shape. The student may NOT erase.",
        "image": require('../assets/draw-3.png').default,
        "type": "draw"
    },
    {
        "id": 5,
        "question": "Draw a horizontal straight line without any help of ruler",
        "image": "",
        "type": "draw"
    },
    {
        "id": 6,
        "question": "Draw a vertical straight line without any help of ruler",
        "image": "",
        "type": "draw"
    },
    {
        "id": 7,
        "question": "Write the text given in image.",
        "image": require('../assets/write-1.png').default
    }
]
}

export default TEST_HANDWRITING