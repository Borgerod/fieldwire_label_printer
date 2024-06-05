# fieldwire_label_printer
 For Energy Controll AS; download selected fields for all components for a given project  



## Quick Install & Usage:

#### [On Windows]
    To install: double-click install.bat
    To run app: double-click run.bat

#### [On MacOS/Linux]
    To install: double-click install.sh
    To run app: double-click run.sh

## Manual Install & Usage
NOTE: env/ should be created in cd download_component_labels/

### [ON WINDOWS]:
#### To install: 
    cd download_component_labels
    python -m venv env
    .\env\Scripts\activate
    pip install -r requirements.txt
    npm install 
    
#### To run Backend: (in the same terminal)
    python -m uvicorn src.backend.app:app --reload

#### To run Frontend: (open new terminal)
    cd download_component_labels
    .\env\Scripts\activate
    npm start

### [ON MAC/LINUX]
#### To install: 
    cd download_component_labels 
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    npm install 
    
#### To run Backend: (in the same terminal)
    cd download_component_labels
    .\env\Scripts\activate
    python -m uvicorn src.backend.app:app --reload
    
#### To run Frontend: (open new terminal)
    cd download_component_labels
    source env/bin/activate
    npm start


## File Structure
    src/
    |   
    ├── backend/
    |    ├── __pycache__/
    |    ├── __init__.py
    |    ├── api_token.py    
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
    │   ├── checkbox.css
    │   ├── field_selection.css
    │   ├── font.css
    │   ├── index.css
    │   └── theme.css
    │
    ├── utils/
    │   ├── api.js
    │   ├── csvUtils.js
    │   └── sortUtils.js
    │
    ├── App.js
    └── index.js


## Previews
Not in use:
![Screenshot 2024-06-05 140702](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/1782a308-1b0a-4bba-8393-4bc5dfd09ee2)

In use:
![Screenshot 2024-06-05 140832](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/76f04884-256d-4374-a180-790d8c451410)


### Alternativ Figma designs

Based on Parent apps Design
![Screenshot 2024-06-01 135111](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/e16732db-e451-4ddb-a487-3ed3390a7d5f)

Compact version
![Screenshot 2024-06-01 145417](https://github.com/Borgerod/fieldwire_label_printer/assets/97392841/af975fbc-6860-4817-9934-63f429f6823c)


## Disclaimer
When I accepted this test, I assumed it went without saying, but just to clarify; 
This is not a commissioned or voluntared work, this is for evaluation purposes only and you do not have my permission to use my work.
You will ofcourse have my permission once I have recieved my employment contract as we (me and tommmy) have discussed.



