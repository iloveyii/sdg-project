import psycopg2
from psycopg2.extras import RealDictCursor
from config import config
import json

def loadData(query):
    """ Query a table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(query, (52))
        rows = cur.fetchall()
        # print("The number of parts: ", cur.rowcount)
        # for row in rows:
        #     print(row)
        # cur.close()
        return rows
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def loadOne(query, id):
    """ Query a table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(query, (id,))
        rows = cur.fetchone()
        return rows
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def saveMeta(location, category, dateTime,fileName,uploadName,columnNames):
    """ Save fcs meta """
    sql = """INSERT INTO tbmeta(location,category,datetime,filename,uploadname,channels)
            VALUES(%s,%s,%s,%s,%s,%s) RETURNING id;"""
    conn = None
    vendor_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (location,category,dateTime,fileName,uploadName,columnNames))
        # get the generated id back
        vendor_id = cur.fetchone()[0]

        conn.commit()
        
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
 
    return vendor_id


def listArrayToJson(listIn):
    x = ''.join(listIn)
    # print (x)
    
    print(x.split(','))

    data=[]
    for i in x.split(','): 
        item = {"id":i,"name":i}
        data.append(item)
        
    return json.dumps(data)


