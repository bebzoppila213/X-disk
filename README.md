# Добро пожаловать в репозиторий проекта X-Disk
Проект создан с использованием таких технологий как React и Django
## Запуск проекта через докер
1. Клонируйте проект **git clone https://github.com/bebzoppila213/X-disk.git**
2. Пропишите комманду **docker-compose up**
## Запуск проекта не через докер
1. Клонируйте проект **git clone https://github.com/bebzoppila213/X-disk.git**
2. Перейдите в директорию back **cd ./back**
3. Создайте виртуальное окружение **python -m venv env**
4. Активируйте виртуальное окружение Windows **venv\Scripts\activate.bat** Linux **source venv/bin/activate**
5. Перейдите в папку disk **cd ./disk**
6. Установите необходимы зависимости **pip install -r requirements.txt**
7. Запустите сервер **python manage.py runserver**
8. Вернитесь в корневую директорию проекта
9. Перейдите в директорию front **cd ./front**
10. Установите зависимости **npm install**
11. Запустите проект **npm serve**
12. С богом!!