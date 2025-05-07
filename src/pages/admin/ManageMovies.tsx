import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMedia } from '../../context/MediaContext';
import ContentList from '../../components/admin/ContentList';
import ContentForm from '../../components/admin/ContentForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Movie } from '../../types';

const ManageMovies: React.FC = () => {
  const { movies, addMovie, updateMovie, deleteMovie } = useMedia();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      setCurrentMovie(movie);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      setCurrentMovie(movie);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddSubmit = (data: Partial<Movie>) => {
    addMovie(data as Omit<Movie, 'id'>);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (data: Partial<Movie>) => {
    if (currentMovie) {
      updateMovie(currentMovie.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentMovie) {
      deleteMovie(currentMovie.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gérer les films</h1>
          <p className="text-gray-600">Ajoutez, modifiez ou supprimez des films</p>
        </div>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Ajouter un film
        </Button>
      </div>

      <ContentList
        type="movie"
        items={movies}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add Movie Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un film"
        size="lg"
      >
        <ContentForm
          type="movie"
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Movie Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Modifier: ${currentMovie?.title}`}
        size="lg"
      >
        {currentMovie && (
          <ContentForm
            type="movie"
            initialData={currentMovie}
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
            Êtes-vous sûr de vouloir supprimer le film{' '}
            <span className="font-semibold">{currentMovie?.title}</span> ?
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

export default ManageMovies;