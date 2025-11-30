import React, { useState, useEffect } from 'react';
import { Layout, Button, Input, message, Card, Typography, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons';
import { employeeService } from './services/employeeService';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async (searchTerm = '') => {
    setLoading(true);
    try {
      const data = searchTerm
        ? await employeeService.searchByDepartment(searchTerm)
        : await employeeService.getAll();

      setEmployees(data);
      if (searchTerm) message.success(`Encontrados: ${data.length}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmployees([]);
        message.warning('No se encontraron resultados');
      } else {
        message.error('Error al cargar datos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchTerm);
    }, 500);

    // Cleanup function: limpia el timer si searchTerm cambia antes de los 500ms
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      await employeeService.create(values);
      message.success('Guardado correctamente');
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      message.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <TeamOutlined style={{ fontSize: '24px', color: 'white', marginRight: 10 }} />
        <Title level={4} style={{ color: 'white', margin: 0 }}>Gestión Empleados</Title>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Card>
          {/* SISTEMA DE REJILLA RESPONSIVE */}
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            {/* Buscador: 100% ancho en móvil (xs), 50% en tablet/pc (md) */}
            <Col xs={24} md={12} lg={8}>
              <Input
                placeholder="Buscar por departamento..."
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            {/* Botón: 100% ancho en móvil, alineado a la derecha en PC */}
            <Col xs={24} md={12} lg={16} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
                block={window.innerWidth < 768} // Botón ancho completo solo en móvil
              >
                Nuevo Empleado
              </Button>
            </Col>
          </Row>

          <EmployeeTable employees={employees} loading={loading} />
        </Card>
      </Content>

      <EmployeeModal
        open={isModalOpen}
        onCreate={handleCreate}
        onCancel={() => setIsModalOpen(false)}
        loading={loading}
      />

      <Footer style={{ textAlign: 'center' }}>Tech Test 2025</Footer>
    </Layout>
  );
};

export default App;