import React, { useEffect, useState } from 'react';
import { Comment, List, Avatar, Space, message } from 'antd';
import { getComments } from '../Utils/api';

const MAX_COMMENTS = 20;

const Comments = ({ commentIds, hideComments }) => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    useEffect(() => {
        const getCommentsData = async () => {
            setCommentsLoading(true);
            const { data, error } = await getComments(commentIds, MAX_COMMENTS);

            setComments(data);
            setCommentsLoading(false);

            if (error) {
                message.error('something went wrong', error.message);
            }
        }

        getCommentsData();
    }, [commentIds]);

    return (
        <List
            style={{width: "90%", marginLeft: "auto", marginRight: "90px"}}
            size="large"
            dataSource={comments}
            loading={commentsLoading}
            header={<Space><span>{comments.length} Comments</span><a href="#top" onClick={hideComments}>Hide Comments</a></Space>}
            renderItem={item => (
                <Comment
                  key={item.id}
                  author={<a href="#top">{item.by}</a>}
                  avatar={
                    <Avatar style={{ backgroundColor: '#8080809c' }}>
                        C
                    </Avatar>
                  }
                  content={
                    <p dangerouslySetInnerHTML={{ __html: item.text }} />
                  }
                  datetime={new Date(item.time * 1000).toUTCString()}
                />
            )}
        />
    );
};

export default Comments;
