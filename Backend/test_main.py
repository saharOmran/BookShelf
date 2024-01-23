from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


#adding a user (POST)
def test_add_user():
    response = client.post("/user/create", json={"username" : "user1",
                                                 "email" : "user@gmail.com",
                                                 "password": "1234",
                                                         })
    assert response.status_code == 200
    assert response.json() == {"username": "user1",
                               "email" : "user@gmail.com"}




#getting a user by username (GET)
def test_get_user():
    response = client.get("/user/get_user/user1")
    assert response.json() == {"username": "user1",
                               "email": "user@gmail.com"}
    assert response.status_code == 200




#editing a user (PUT)
def test_edite_user():
        response = client.put("/user/edite_user/2", json={"username": "user1",
                                                          "password": 1234,
                                                          "email": "user@gmail.com",
                                                        })
        assert response.status_code == 401




#deleting a user (DELETE)
def test_delete_user():
    response = client.delete("/user/delete_user/2")
    assert response.status_code == 401


