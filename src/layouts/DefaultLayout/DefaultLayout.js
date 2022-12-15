import { DownOutlined, PoweroffOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './DefaultLayout.module.scss'
import storage from '~/untils/storage'
import API from '~/config/fetchApi'

function DefauLayout({ children }) {

  const nagative = useNavigate()
  const [username, setUsername] = useState()
  const [amount, setAmount] = useState()
  
  useEffect(() => {
    API.requestGetAPI("/api/users/information")
    .then( async (res) => {
      await storage.setData(res.data)
      setUsername(storage.getData()?.username)
      setAmount(storage.getData()?.amount)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const items = [
    {
      key: '1',
      label: (
        <div>
          <Space>
            <UserOutlined />
            {username}
          </Space>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <Space>
          <WalletOutlined />
            {amount}$
          </Space>
        </div>
      ),
    },
    {
      key: '3',
      label: (
          <a
            style={{ color: 'black' }}
            href="/login"
            onClick={() => {
              localStorage.clear()
            }}
          >
            <Space>
              <PoweroffOutlined />
              Logout
            </Space>
          </a>
      ),
    },
  ]

  const itemsMenu = [
    { label: <Link to="/freelancers">FIND TALENT</Link>, key: 'item-1' },
    { label: <Link to="/jobs">FIND OWNER JOBS</Link>, key: 'item-2' },
    { label: <Link to="/jobs-freelancer">FIND FREELANCER JOB</Link>, key: 'item-3' },
    { label: 'ABOUT US', key: 'item-4' },
    {
      label: (
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      ),
      key: 'item-5',
    },
  ]
  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo} onClick={() => nagative('/')}>
          <img src={require('~/assets/img/logo/logo.png')} />
          <div>FFlancer</div>
        </div>
        <Menu className={styles.nav} mode="horizontal" items={itemsMenu} selectedKeys={false} />
      </div>
      <div className={styles.container}>{children}</div>
      <div className={styles.footer}>© 2021 FFLance® Global Inc.</div>
    </>
  )
}

export default DefauLayout
