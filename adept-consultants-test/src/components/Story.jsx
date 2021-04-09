import React, { useState, useEffect } from 'react';
import { List, Skeleton, Space, Avatar, Tooltip, message } from 'antd';
import { MessageOutlined, StockOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getStoryById } from '../Utils/api';
import Comments from './Comments';

const IconText = ({ icon, text, toolTip, onClick }) => (
    <Tooltip title={toolTip}>
        <Space onClick={onClick ? onClick : () => {}}>
            {React.createElement(icon)}
            {text}
        </Space>
    </Tooltip>
);

const Story = ({ storyId }) => {
    const [storyData, setStoryData] = useState(null);
    const [loadingStoryData, setLoadingStoryData] = useState(true);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const getStoryData = async () => {
            const { data, error } = await getStoryById(storyId);

            setStoryData(data);
            setLoadingStoryData(false);

            if (error) {
                message.error('something went wrong', error.message);
            }
        };

        getStoryData();
    }, [storyId]);

    return (<>
        <List.Item
            actions={!loadingStoryData ? [
                <IconText icon={StockOutlined} text={storyData.score} toolTip="Score" key="list-score-message" />,
                <IconText icon={MessageOutlined} text={storyData.kids.length} toolTip="Comments" onClick={() => setShowComments(!showComments)} key="list-comments-count" />,
                <IconText icon={UserOutlined} text={storyData.by} toolTip="Posted By" key="list-posted-by-message" />,
                <IconText icon={ClockCircleOutlined} text={new Date(storyData.time * 1000).toUTCString()} toolTip="Created At" key="list-time-at" />,
            ] : []}
            className="story-item"
        >
            {loadingStoryData && <Skeleton active />}
            {!loadingStoryData && storyData && (
            <>
                <List.Item.Meta
                    avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>S</Avatar>}
                    title={storyData.title}
                    description={<p dangerouslySetInnerHTML={{ __html: storyData.text }}></p>}
                />
                {showComments && <Comments commentIds={storyData.kids} hideComments={() => setShowComments(false)} />}
            </>)}
            
        </List.Item>
    </>)

};

export default Story;
