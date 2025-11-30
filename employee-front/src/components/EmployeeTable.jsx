import { Table, Space } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';

const EmployeeTable = ({ employees, loading }) => {

    const columns = [
        {
            title: 'Cédula',
            dataIndex: 'docNumber',
            key: 'docNumber',
            render: t => <Space><IdcardOutlined /> {t}</Space>
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Apellido',
            dataIndex: 'surname',
            key: 'surname',
            sorter: (a, b) => a.surname.localeCompare(b.surname)
        },
        {
            title: 'Depto',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'IT', value: 'IT' },
                { text: 'Ventas', value: 'Ventas' },
                { text: 'RRHH', value: 'Recursos Humanos' }
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0
        },
        {
            title: 'Salario',
            dataIndex: 'salary',
            key: 'salary',
            render: v => <span style={{ color: 'green' }}>${v}</span>
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={employees}
            rowKey="docNumber"
            loading={loading}
            pagination={{ pageSize: 6 }}
            scroll={{ x: 700 }}
        />
    );
};

export default EmployeeTable;