import React from 'react';
import { Tag, Space, Card, Rate } from 'antd';
import styles from './index.less';

export type FeedTagsProps = {
  tags?: string[];
  name?: string;
};

const HeadArea: React.FC<FeedTagsProps> = (props) => {
  const { tags, name, ...restProps } = props;

  return (
    <div className={styles.headArea}>
      {tags?.map((i) => (
        <Tag color="default" key={i}>
          {i}
        </Tag>
      ))}

      <div className={styles.manageTitle}>
        {name}
        <Rate disabled defaultValue={2} />
      </div>
    </div>
  );
};

export default HeadArea;
