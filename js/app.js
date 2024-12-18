document.getElementById('reservationForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;

  // Validar campos obligatorios
  let isValid = true;

  // Validar campos de texto obligatorios
  form.querySelectorAll('input[required]').forEach((input) => {
      if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
      } else {
          input.classList.remove('is-invalid');
      }
  });

  // Validar que al menos un checkbox esté seleccionado
  const checkboxes = Array.from(form.querySelectorAll('.form-check-input'));
    const isChecked = checkboxes.some(checkbox => checkbox.checked);

  if (!isChecked) {
      isValid = false;
      alert('Por favor, selecciona al menos un tour.');
  }

  // Si hay errores, detener el envío
  if (!isValid) {
      return;
  }

  // Envío asincrónico con validaciones completadas
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
          console.log("Formulario enviado exitosamente.");
          

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
