# fieldwire_label_printer
 For Energy Controll AS; download selected fields for all components for a given project  



## Usage

### Backend:
    NOTE: env/ should be created in cd download_component_labels/

    [ON WINDOWS]
    cd download_component_labels
    python -m venv env
    .\env\Scripts\activate
    pip install -r requirements.txt
    python -m uvicorn src.backend.app:app --reload

    [ON MAC/LINUX]
    cd download_component_labels 
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    python -m uvicorn src.backend.app:app --reload
    
    
### Frontend: 
    cd download_component_labels
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


## Previews
upon opening
![Screenshot 2024-06-01 145234](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/51fbff12-29b6-4eef-87a6-236bea8ed00c)
upon usage
![Screenshot 2024-06-01 145221](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/2e393f26-a67c-440f-a5d9-1f164d2ae6ef)

### Alternativ Figma designs

Based on Parent apps Design
![Screenshot 2024-06-01 135111](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/e16732db-e451-4ddb-a487-3ed3390a7d5f)

Compact version
![Screenshot 2024-06-01 145417](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/af975fbc-6860-4817-9934-63f429f6823c)


## Disclaimer
When I accepted this test, I assumed it went without saying, but just to clarify; 
This is not a commissioned or voluntared work, this is for evaluation purposes only and you do not have my permission to use my work.
You will ofcourse have my permission once I have recieved my employment contract as we (me and tommmy) have discussed.



