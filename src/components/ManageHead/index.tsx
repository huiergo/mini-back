import React from 'react';
import { Tag, Space, Card, Rate } from 'antd';
import styles from './index.less';

export type FeedTagsProps = {
  tags?: string[];
  name?: string;
};

const ManageHeader: React.FC<FeedTagsProps> = (props) => {
  const { tags, name, ...restProps } = props;

  return (
    <div className={styles.manageTitle}>
      {name}
      <Rate disabled defaultValue={2} />
    </div>
  );
};

export default ManageHeader;
