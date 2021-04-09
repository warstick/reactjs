import React, { useEffect, useState } from 'react';
import Api from '../Utils/Api';
import Comments from './Comments';

const { getStoryById } = Api;

const Story = ({storyId}) => {
    const [ storyData, setStoryData ] = useState(null);
    const [loadingStoryData, setLoadingStoryData] = useState(true);
    const [viewComments, setViewComments] = useState(false);

    useEffect(() => {
        const getStoreData = async () => {
            const { data } = await getStoryById(storyId);

            setStoryData(data || null);
            setLoadingStoryData(false);
        };

        getStoreData();

        return () => {
            setViewComments(false);
        };
    }, [storyId]);

    return (<>
        {loadingStoryData && <div className="story">Story Data is loading</div>}
        {!loadingStoryData && storyData && <div className="story">
            <h3>{storyData.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: storyData.text }}></p>
            <div className="story-meta-info">
                <span className="comments-btn" onClick={() => setViewComments(!viewComments)}>{!viewComments ? "View Comments" : "Hide Comments"}</span>
                <span>Score:<label>{storyData.score || "NA"}</label></span>
                <span>Posted By:<label>{storyData.by || "NA"}</label></span>
                <span>Posted At:<label>{new Date(storyData.time * 1000).toUTCString()}</label></span>
            </div>
            {viewComments && <Comments commentIds={storyData.kids} />}
        </div>}
    </>);
};

export default Story;
