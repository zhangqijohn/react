import { Alert } from 'antd'
import React from 'react';
import { useRouteMatch } from 'react-router-dom'

export default function() {
  const { path, url } = useRouteMatch();
  const msg = JSON.stringify({ path, url })
  return (
    <Alert message={`${msg}开发中...`} type="warning" />
  );
}