import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMedia } from '../../context/MediaContext';
import ContentList from '../../components/admin/ContentList';
import ContentForm from '../../components/admin/ContentForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Series } from '../../types';

const ManageSeries: React.FC = () => {
  const { series, addSeries, updateSeries, deleteSeries } = useMedia();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState<Series | null>(null);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    const seriesItem = series.find(s => s.id === id);
    if (seriesItem) {
      setCurrentSeries(seriesItem);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const seriesItem = series.find(s => s.id === id);
    if (seriesItem) {
      setCurrentSeries(seriesItem);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddSubmit = (data: Partial<Series>) => {
    addSeries(data as Omit<Series, 'id'>);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (data: Partial<Series>) => {
    if (currentSeries) {
      updateSeries(currentSeries.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentSeries) {
      deleteSeries(currentSeries.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gérer les séries</h1>
          <p className="text-gray-600">Ajoutez, modifiez ou supprimez des séries</p>
        </div>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Ajouter une série
        </Button>
      </div>

      <ContentList
        type="series"
        items={series}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add Series Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter une série"
        size="xl"
      >
        <ContentForm
          type="series"
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Series Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Modifier: ${currentSeries?.title}`}
        size="xl"
      >
        {currentSeries && (
          <ContentForm
            type="series"
            initialData={currentSeries}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="sm"
      >
        <div className="text-white">
          <p>
            Êtes-vous sûr de vouloir supprimer la série{' '}
            <span className="font-semibold">{currentSeries?.title}</span> ?
          </p>
          <p className="mt-2 text-red-400">Cette action est irréversible.</p>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageSeries;