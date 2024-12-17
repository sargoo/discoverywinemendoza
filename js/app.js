document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch("https://formsubmit.co/ajax/d303fee054e5cb714e495217bddd9bfc", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // Mostrar mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('d-none');
  
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.querySelector('#reservationModal'));
        modal.hide();
  
        // Limpiar formulario
        form.reset();
  
        // Ocultar mensaje después de unos segundos
        setTimeout(() => {
          successMessage.classList.add('d-none');
        }, 5000);
      } else {
        alert('Error al enviar el formulario. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el envío.');
    }
  });
  