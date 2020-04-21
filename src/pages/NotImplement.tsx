import { Alert } from 'antd'
import React from 'react';
import { useRouteConfig } from '@/context'

export default function() {
  const route = useRouteConfig();
  return (
    <Alert message={<>{route?.title}</>} type="warning" />
  );
}