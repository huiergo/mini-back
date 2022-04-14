import React from 'react';
import { Tag, Space, Card } from 'antd';
import styles from './index.less';

export type FeedTagsProps = {
  tags?: string[];
};

const FeedArea: React.FC<FeedTagsProps> = (props) => {
  const { tags, ...restProps } = props;

  return (
    <div className={styles.feedTags}>
      <div>反馈建议</div>
      <Space
        size={0}
        style={{
          width: 272,
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {tags?.map((i) => {
          return (
            <Tag color="default" key={i}>
              {i}
            </Tag>
          );
        })}
      </Space>
    </div>
  );
};

export default FeedArea;
