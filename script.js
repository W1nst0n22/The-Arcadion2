document.addEventListener('DOMContentLoaded', function() {
    const checkboxIds = [
        'checkbox1', 'checkbox2', 'checkbox3', 'checkbox4', 'checkbox5', 'checkbox6', 'checkbox7', 'checkbox8',
        'checkbox9', 'checkbox10', 'checkbox11', 'checkbox12', 'checkbox13', 'checkbox14', 'checkbox15', 'checkbox16',
        'checkbox17', 'checkbox18', 'checkbox19', 'checkbox20', 'checkbox21', 'checkbox22', 'checkbox23', 'checkbox24',
        'checkbox25', 'checkbox26', 'checkbox27', 'checkbox28', 'checkbox29', 'checkbox30', 'checkbox31', 'checkbox32',
        'checkbox33', 'checkbox34', 'checkbox35', 'checkbox36', 'checkbox37', 'checkbox38', 'checkbox39', 'checkbox40',
        'checkbox41', 'checkbox42', 'checkbox43', 'checkbox44', 'checkbox45', 'checkbox46', 'checkbox47', 'checkbox48',
        'checkbox49', 'checkbox50', 'checkbox51', 'checkbox52', 'checkbox53', 'checkbox54', 'checkbox55', 'checkbox56',
        'checkbox57', 'checkbox58', 'checkbox59', 'checkbox60', 'checkbox61', 'checkbox62', 'checkbox63', 'checkbox64',
        'checkbox65', 'checkbox66', 'checkbox67', 'checkbox68', 'checkbox69', 'checkbox70', 'checkbox71', 'checkbox72',
        'checkbox73', 'checkbox74', 'checkbox75', 'checkbox76', 'checkbox77', 'checkbox78', 'checkbox79', 'checkbox80',
        'checkbox81', 'checkbox82', 'checkbox83', 'checkbox84', 'checkbox85', 'checkbox86', 'checkbox87', 'checkbox88',
        'M1S', 'M2S','M3S', 'M4S', 'tomestone1', 'tomestone2', 'tomestone3', 'tomestone4', 'tomestone5', 'tomestone6', 
        'tomestone7', 'tomestone8', 'solvent1', 'solvent2', 'solvent3', 'solvent4', 'solvent5', 'solvent6', 'solvent7',
        'solvent8'
    ];

    function loadCheckboxStates() {
        checkboxIds.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = JSON.parse(localStorage.getItem(id)) || false;
                updateItemState(checkbox, checkbox.checked);
            }
        });
        updateHighlights();
    }

    function saveCheckboxStates() {
        checkboxIds.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                localStorage.setItem(id, checkbox.checked);
            }
        });
    }

    function updateItemState(checkbox, isChecked) {
        const item = checkbox.closest('.item');
        if (item) {
            if (isChecked) {
                item.classList.add('checked');
            } else {
                item.classList.remove('checked');
            }
        }
    }

    function updateHighlights() {
        document.querySelectorAll('.item').forEach(item => {
            const itemDropText = item.querySelector('.item-drop') ? item.querySelector('.item-drop').textContent.trim() : '';
            const isHighlighted = Array.from(document.querySelectorAll('#set3 input[type="checkbox"]')).some(checkbox => {
                const associatedSpan = checkbox.previousElementSibling.textContent.trim();
                return checkbox.checked && associatedSpan === itemDropText;
            });
            if (isHighlighted) {
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    }

    // Event listeners
    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                updateItemState(this, this.checked);
                saveCheckboxStates();
                updateHighlights();
            });
        }
    });

    // Load states on page load
    loadCheckboxStates();
});

function clearCheckboxes(setId) {
    const checkboxes = document.querySelectorAll(`#${setId} input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        localStorage.removeItem(checkbox.id);
        updateItemState(checkbox, false);
    });
    updateHighlights(); // Update highlights after clearing checkboxes
}
