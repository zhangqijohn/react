import './index.css'
import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'

export interface BreadcrumbProps {

}

export default function (props: BreadcrumbProps) {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((current, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{current}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb className="bread-crumb">{breadcrumbItems}</Breadcrumb>
  );
}