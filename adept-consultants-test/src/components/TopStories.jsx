import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { getTopStories } from '../Utils/api';
import Story from './Story';

const MAX_TOP_STORIES = 10;

const TopStories = () => {
    const [topStories, setTopStories] = useState([]);
    const [topStoriesLoading, setTopStoriesLoading] = useState(true);

    useEffect(() => {
        const getTopStoriesData = async () => {
            const { data, error } = await getTopStories(MAX_TOP_STORIES);

            setTopStories(data || []);
            setTopStoriesLoading(false);

            if (error) {
                message.error('something went wrong', error.message);
            }
        };

        getTopStoriesData();
    }, []);

    return (<>
        <List
            itemLayout="vertical"
            size="large"
            dataSource={topStories}
            loading={topStoriesLoading}
            renderItem={item => <Story key={item} storyId={item} />}
        />
    </>);
};

export default TopStories;
