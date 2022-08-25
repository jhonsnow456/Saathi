const TEST_STORY = {
    details: {
        name: 'Story'
    },
    stories: [
        {
            details: {
                name: 'Hide and Seek',
            },
            pictures: [
                {
                    id: 'a1',
                    image: require('../assets/story/hs1.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs2.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs3.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs4.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs5.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs6.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs7.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs8.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs9.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs10.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs12.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs13.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs14.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs15.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs16.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs17.png')
                },
                {
                    id: 'a1',
                    image: require('../assets/story/hs18.png')
                },
            ],
            questions: [
                {
                    title: 'Who was seeking in the story',
                    options: ["Jeet", "Babli", "Mohit", "Uma"],
                    correctAns: 'Jeet',
                    type: 'options'
                },
                {
                    title: 'Write the name of child who was found first.',
                    correctAns: 'Mohit',
                    type: 'voice'
                },
                {
                    title: 'Where was Meeta hiding',
                    options: ["Behind dadi", "courtyard", "On tree", "under bed"],
                    correctAns: 'Behind dadi',
                    type: 'options'
                },
                {
                    title: 'Choose correct image of Naziya.',
                    options: [
                        {name: 'Uma', image:require('../assets/story/qhs1.png')},
                        {name: 'Meeta', image:require('../assets/story/qhs2.png')},
                        {name: 'Naziya', image:require('../assets/story/qhs3.png')},
                    ],
                    correctAns: 'Naziya',
                    type: 'options_image'
                },
            ]
        }
    ]
}

export default TEST_STORY