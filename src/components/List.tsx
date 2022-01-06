import { useEffect, useState } from "react"
import { getRecords } from "../api/get-records";
import { List, Skeleton, Switch } from 'antd';
import { toggleApprove } from "../api/toggle-approve";
import { useProps } from "../hooks";

export default () => {
  const [records, setRecords] = useState<Array<IRecord>>([])
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [togglingId, setTogglingId] = useState(-1);
  const { Auth } = useProps(state => state)
  useEffect(() => {
    getRecords(Auth.token)
      .then(res => setRecords(res))
      .finally(() => setLoading(false))
  }, []);

  const onToggleApproveClick = (id: string, index: number) => {
    setTogglingId(index)
    setToggling(true);
    toggleApprove(id, Auth.token)
      .then(res => {
        setRecords(prev => {
          const newArray = prev.map(item => {
            if (item._id === id) {
              item.isApproved = res.isApproved
            }
            return item
          })
          return newArray;
        })
      })
      .finally(() => setToggling(false))
  }

  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      dataSource={records}
      renderItem={(item, i) => (
        <List.Item
          actions={[<Switch loading={toggling && togglingId === i} checked={item.isApproved} onChange={() => onToggleApproveClick(item._id, i)} />]}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.itemName}</a>}
              description={item.price}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}