import json
import pdb
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse
from tesigners.models import *

def value_from_req(request,key,default):
    value = getattr(request, 'GET').get(key)
    if not value:
        value = getattr(request, 'POST').get(key)
    if not value:
        return default
    return value

def listvalue_from_req(request,key,default):
    value = getattr(request, 'GET').getlist(key)
    if not value:
        value = getattr(request, 'POST').getlist(key)
    pdb.set_trace()
    if not value:
        return default
    return value

def index(request):
    return render_to_response("index.html",locals(),context_instance=RequestContext(request))

def dashboard(request):
    return render_to_response("dashboard.html",locals(),context_instance=RequestContext(request))

def login(request):
    return render_to_response("dashboard.html",locals(),context_instance=RequestContext(request))

def signup(request):
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
    email = value_from_req(request,'eId','')
    password = value_from_req(request,'password','')
    phoneNumber = value_from_req(request,'pNumber','')
    bName = value_from_req(request,'bName','')
    dName = value_from_req(request,'dName','')
    vNum = value_from_req(request,'vNum','')
    cDesc = value_from_req(request,'cDesc','')

    addr1 = value_from_req(request,'addr1','')
    addr2 = value_from_req(request,'addr2','')
    landmark = value_from_req(request,'landmark','')
    city = value_from_req(request,'city','')
    state = value_from_req(request,'state','')
    pincode = value_from_req(request,'pCode','')

    acHName = value_from_req(request,'acHName','')
    acNumber = value_from_req(request,'acNumber','')
    bankName = value_from_req(request,'bankName','')
    branchName = value_from_req(request,'branchName','')
    ifsc = value_from_req(request,'ifsc','')

    seller = Seller.objects(email_id = email).first()
    if not seller:
        address = Address()
        address.address_ine_1 = addr1
        address.address_ine_2 = addr2
        address.landmark = landmark
        address.city = city
        address.state = state
        address.pincode = int('0' +pincode)
        address.save()

        bankAccount = BankAccount()
        bankAccount.holder_name = acHName
        bankAccount.account_number = int('0' +acNumber)
        bankAccount.bank_name = bankName
        bankAccount.branch = branchName
        bankAccount.ifsc = ifsc
        bankAccount.save()

        seller = Seller()
        seller.email_id = email
        seller.phoneNumber = phoneNumber
        seller.business_name = bName
        seller.display_name = dName
        seller.company_description = cDesc
        seller.vat = vNum

        seller.address = address
        seller.bank_acc = bankAccount

        seller.save()
        seller.set_password(password)

    #return render_to_response("signup.html",locals(),context_instance=RequestContext(request))
    return HttpResponse(json.dumps({'status':'success','message':'signup successful'}))

def store_seller_supported_products(request):
    seller_id = value_from_req(request,'sId','')
    product_list = listvalue_from_req(request,'plist[]','[]')
    printing_type_list = listvalue_from_req(request,'ptlist[]','[]')
    pdb.set_trace()

    seller = Seller.objects(email_id=seller_id).first()
    if seller:
        for item in product_list:

            productType = value_from_req(request,'item.ptype','')
            productSubType = value_from_req(request,'item.psubtype','')
            price = value_from_req(request,'item.price','')
            #sku = value_from_req(request,'item.sku','')
            size = value_from_req(request,'item.size','')
            color = value_from_req(request,'item.color','')
            sleeves = value_from_req(request,'item.slv','')
            fabric = value_from_req(request,'item.fabric','')
            material = value_from_req(request,'item.mat','')

            pdb.set_trace()
            #seller_product = Seller_Product()
            #seller_product.seller = seller;
            #seller_product.price = price
            #seller_product.product_sku = sku
            #seller_product.save()

            product = Product()
            product.seller=seller
            product.type=productType
            product.subtype=productSubType
            product.size=size
            product.color=color
            product.sleeves=sleeves
            product.fabric=fabric
            product.material=material
            product.price=price
            product.save()
            pdb.set_trace()

        for item in printing_type_list:
            printingType = value_from_req(request,'item.pttyp','')
            min_order = value_from_req(request,'item.morder','')
            order_capacity= value_from_req(request,'item.ocap','')
            printing_price = value_from_req(request,'item.ptprice','')

            printer_type = PrinterType()
            printer_type.seller = seller;
            printer_type.type = printingType;
            printer_type.min_order = min_order;
            printer_type.order_capacity = order_capacity;
            printer_type.printing_price = printing_price;
            printer_type.save()
            pdb.set_trace()

        return HttpResponse(json.dumps({'status':'success','message':'signup successful'}))


def show_order(request):
    seller_id = value_from_req(request,'email_id','')
    order_type = value_from_req(request,'type','')
    seller = Seller.objects(email_id=seller_id).first()
    if seller:
        orders = []
        for order in OrderDetails.objects(seller=seller,current_status__lte=7):
            orders.append({'img':order.design_image,'description':order.product.type,'qty':order.quantity,'price':order.price,'status':order.current_status})

        return HttpResponse(json.dumps({'status':True,'response':orders}))
