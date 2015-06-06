import json
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from tesigners.models import *

def value_from_req(request,key,default):
    value = getattr(request, 'GET').get(key)
    if not value:
        value = getattr(request, 'POST').get(key)
    if not value:
        return default
    return value

def index(request):
    return render_to_response("index.html",locals(),context_instance=RequestContext(request))

def login(request):
    return render_to_response("dashboard.html",locals(),context_instance=RequestContext(request))

def signup(request):
    email = value_from_req(request,'email_id','')
    password = value_from_req(request,'password','')
    phone_number = value_from_req(request,'phoneNumber','')
    return render_to_response("signup.html",locals(),context_instance=RequestContext(request))

def authenticate_user(request):

    email = value_from_req(request,'email_id','')
    password = value_from_req(request,'password','')
    seller = Seller.objects(email_id = email).first()
    if not seller:
        return HttpResponse(json.dumps({'status':'failed','message':'User does not exist'}))
    validLogin = seller.check_password(password)
    if not validLogin:
        return HttpResponse(json.dumps({'status':'failed','message':'Username and password did not match'}))
    return HttpResponse(json.dumps({'status':'success','message':'login successful'}))

def create_user(request):

    email = value_from_req(request,'email_id','')
    password = value_from_req(request,'password','')
    phoneNumber = value_from_req(request,'phoneNumber','')
    seller = Seller.objects(email_id = email).first()
    if not seller:
        seller = Seller()
        seller.email_id = email
        seller.phoneNumber = phoneNumber
        seller.save()
        seller.set_password(password)

    return render_to_response("index.html",locals(),context_instance=RequestContext(request))


def show_my_order(request):
    seller_id = value_from_req(request,'seller_id','')
    seller = Seller(id=seller_id).first()
    if seller:
        orders = []
        for order in OrderDetails.objects(seller=seller):
            orders.append({'status':order.current_status,'quantity':order.quantity,'prod_type':order.product.type})

        return HttpResponse(json.dumps({'status':True,'response':orders}))
