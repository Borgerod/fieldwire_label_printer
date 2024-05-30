# fieldwire_label_printer
 For Energy Controll AS; download selected fields for all components for a given project  



## Usage

### Backend:
    cd label_printer
    python -m venv env
    .\env\Scripts\activate    (linux: source env/bin/activate)
    pip install -r requirements.txt
    python -m uvicorn backend.app:app --reload

### Frontend: 
    cd label_printer
    npm install 
    npm start

## structure
    src/
    |
    ├── backend/
    |    ├── __pycache__/
    |    ├── __init__.py
    |    └── app.py
    |    
    ├── components/
    │   ├── CloseIconComponent.js
    │   ├── DownloadButton.js
    │   ├── FieldSelection.js
    │   ├── Preview.js
    │   ├── ProjectSelection.js
    │   └── SortSelection.js
    │
    ├── css/
    │   ├── App.css
    │   ├── font.css
    │   └── index.css
    │
    ├── utils/
    │   ├── api.js
    │   ├── csvUtils.js
    │   └── sortUtils.js
    │
    ├── App.js
    ├── App.css
    └── index.js



## Disclaimer
When I accepted this test, I assumed it went without saying, but just to clarify; 
This is not a commissioned or voluntared work, this is for evaluation purposes only and you do not have my permission to use my work.
You will ofcourse have my permission once I have recieved my employment contract as we (me and tommmy) have discussed.
